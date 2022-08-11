import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<GenericDialogComponent> {


/**
 *
 */
constructor(public dialogRef:MatDialogRef<GenericDialogComponent>) {
    
    
}

    close(){
        this.dialogRef.close();
    }
}
