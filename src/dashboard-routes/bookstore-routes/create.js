import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class CreateBookDashboard {
  constructor(httpClient){
    this.httpClient = httpClient;
    if (process.env.NODE_ENV === 'production') {
      this.fetchURL = 'http://ourhandsandfeetbackend.herokuapp.com';
    } else {this.fetchURL = 'http://localhost:7000'; }
    this.newBook = {
      "title":"",
      "type":"",
      "author":"",
      "numberPages":0,
      "dateOfPub":0,
      "url":"",
      "isbn":"",
      "siteLocation":"",
      "numberOfCopies":0,
      "comments":""
    };
    console.log(this.newBook);
  }
  types=["Book", "PDF", "Webpage"];
  newBook = null;
  CSVurl="";
  createBook(){
    console.log(this.newBook);
    if(this.newBook.type != 0){
      this.newBook.type=this.types[this.newBook.type-1];
    }else{
      this.newBook.type="None chosen";
    }
    this.httpClient.fetch(this.fetchURL + "/book/", {
      method:"post",
      body:json(this.newBook)
    })
    .then(response=>response.json())
    .then(data=>{
      console.log("Posted data");
      console.log(data);
    });
  }
  createBooksFromCSV(){
    if(this.CSVurl!=""){
      var data = {"url":this.CSVurl};
      console.log(JSON.stringify(this.CSVurl));
      this.httpClient.fetch(this.fetchURL + "/book/csv", {
        method:"post",
        body: json(data)
      });
    }
  }
}
