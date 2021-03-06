import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import { ProductsService } from '../products.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  selectedFile: ImageSnippet;
  alertUpload:boolean=false
  urlImageCloud:string=""
  uploadForm: FormGroup;
  messageUser : string = "";

  constructor(private formBuilder: FormBuilder,private router: Router,private formbuilder:FormBuilder, private productsService: ProductsService) { }
  addForm: FormGroup;
  ngOnInit(): void {
    this.uploadForm = this.formbuilder.group({
      img: ['']
    });
    this.addForm = this.formBuilder.group({
      //id: [],
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: [, Validators.required],
      Category: ['', Validators.required],
      img: ['', Validators.required],

    });
  }


  get f() { return this.addForm.controls; }

    // onSubmit() {
    //   this.productsService.addProduct(this.addForm.value)
    //     .subscribe( data => {
    //       console.log(data);
    //      this.router.navigate(['']);
    //     });
    // }

    onSubmit(form:any){
      let addedProduct = {
        nom : form.nom,
        description : form.description,
        prix : form.prix,
        Category : form.Category,
        img: this.urlImageCloud
      }

      this.productsService.addProduct(addedProduct).subscribe(()=>{
        this.messageUser = "";
        setTimeout(() => {
          this.router.navigate(['admin/ProductTable']);
        }, 1500);
      });
    }

    onFileSelected(event) {

      const file:File = event.target.files[0];
      if (file) {
        let formData = new FormData();

        console.log(this.uploadForm.get('img').value+"abc");
  //check if the filecount is greater than zero, to be sure a file was selected.
        formData.append('upload_preset', 'kqe7s9ah');
        formData.append('file', file);
        this.productsService.uploadImageService(formData).subscribe((result)=>{
          console.log(result,"updated successfully");
          this.urlImageCloud = result["url"];
          this.alertUpload=true;
        });
      }
    }

    // processFile(imageInput: any) {
    //   const file: File = imageInput.files[0];
    //   const reader = new FileReader();

    //   reader.addEventListener('load', (event: any) => {

    //     this.selectedFile = new ImageSnippet(event.target.result, file);

    //     this.productsService.uploadImage(this.selectedFile.file).subscribe(
    //       (res) => {

    //       },
    //       (err) => {

    //       })
    //   });

    //   reader.readAsDataURL(file);
    // }


}
