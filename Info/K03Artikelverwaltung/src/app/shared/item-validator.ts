import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { ItemService } from "./item-service";

export class ItemValidator {

    constructor(private is: ItemService) {}

    static idFormat(control: AbstractControl): ValidationErrors | null {
        if (control.value == null || control.value == "")
            return { required: true };

        const idPattern = new RegExp("(^IT\\d{6}$)|(^DE\\d{8}$)");
        const match = idPattern.test(control.value);

        if (match)
            return null;
            
        // TODO: checpk if id exists
        return { idFormat: true };
        
    }

    static purchasingPriceLower(fg: AbstractControl): ValidationErrors | null {
        const retailPrice = (fg as FormGroup).controls.retailPrice.value;
        const purchasingPrice = (fg as FormGroup).controls.purchasingPrice.value;
        
        if (purchasingPrice <= retailPrice)
            return null;
            
        return { purchasingPriceLower: true };
    }
}