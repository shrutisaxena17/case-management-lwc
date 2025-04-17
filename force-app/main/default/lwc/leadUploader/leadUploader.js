import { LightningElement, track } from 'lwc';
import saveTempLeads from '@salesforce/apex/LeadCSVController.saveTempLeads';
import startLeadBatch from '@salesforce/apex/LeadCSVController.startLeadBatch';
import getJobStatus from '@salesforce/apex/LeadCSVController.getJobStatus';

export default class LeadUploader extends LightningElement {
    progress = 0;
    showProgress = false;
    isUploadDisabled = true;
    fileData;
    batchJobId;
    jobId;

    handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            this.isUploadDisabled = false;
            const reader = new FileReader();
            reader.onload = () => {
                this.fileData = reader.result;
            };
            reader.readAsText(file);
        }
    }

    async handleUpload() {
        try {
            const parsedData = this.parseCSV(this.fileData);
            this.batchJobId = await saveTempLeads({ leadData: parsedData });
            this.jobId = await startLeadBatch({ batchJobId: this.batchJobId });
            this.showProgress = true;
            this.trackProgress();
        } catch (error) {
            console.error('Upload Error:', error);
            alert('Something went wrong. Check console for details.');
        }
    }

    parseCSV(csv) {
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(',');
            if (row.length === headers.length) {
                const record = {};
                headers.forEach((header, idx) => {
                    record[header] = row[idx].trim();
                });
                data.push(record);
            }
        }

        return data;
    }

    trackProgress() {
        const interval = setInterval(async () => {
            try {
                const job = await getJobStatus({ jobId: this.jobId });
                if (job.Status === 'Completed' || job.Status === 'Failed' || job.Status === 'Aborted') {
                    clearInterval(interval);
                    if (job.Status === 'Completed') {
                        alert('Upload Complete!');
                    } else {
                        alert(`Upload failed with status: ${job.Status}`);
                    }
                }
            } catch (error) {
                clearInterval(interval);
                console.error('Error polling job status:', error);
                alert('Error checking batch status. See console for details.');
            }
        }, 2000); 
    }
}
