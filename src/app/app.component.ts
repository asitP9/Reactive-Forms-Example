import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  forbiddenUsernames=['Anna', 'Chris'];
  personalForm:FormGroup;
  
  ngOnInit(){
    this.personalForm=new FormGroup({
      'userData':new FormGroup({
        "username":new FormControl(null, [Validators.required, this.validationForForbiddenNames.bind(this)]),
        "email": new FormControl(null, [Validators.required, Validators.email], this.asyncValidationForEmail)
      }),
      
      "gender": new FormControl('female'),
      "hobbies": new FormArray([])
    });

    this.personalForm.valueChanges.subscribe(
      (value)=>{
          console.log("value", value);
      }

    )

    this.personalForm.statusChanges.subscribe(
      (status)=>{
        console.log("status", status);
      }
    )

    this.personalForm.setValue({
      'userData':{
        'username':"Asit",
        'email':'asit.p9@gmail.com'
      },
        'gender':'male',
        'hobbies':[]
      
    })

    this.personalForm.patchValue({
      'userData':{
        'username':'Max'
      }
    })
  }

  submitForm(){
    console.log(this.personalForm);
    this.personalForm.reset();
  }
  // getControls(){
  //   return (this.personalForm.get('hobbies') as FormArray).controls;
  // }
  addHobby(){
    const control=new FormControl(null, Validators.required);
    (<FormArray>this.personalForm.get("hobbies")).push(control);
  }

  validationForForbiddenNames(control: FormControl):{[s:string]:boolean}{
      if(this.forbiddenUsernames.indexOf(control.value)>-1)
        return {'nameIsForbidden':true};
      else
        return null; 
  }

  asyncValidationForEmail(control:FormControl):Promise<any> | Observable<any>{
      const promise=new Promise<any>(
        (resolve,reject)=>{
          setTimeout(()=>{
            if(control.value==="test@test.com"){
              resolve({'emailForbidden':true});
            }
            else{
              resolve(null);
            }
          },1500)
      });
      return promise;
    }

}

