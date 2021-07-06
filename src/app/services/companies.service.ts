import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  companies: company[]

  async initCompanies() {
    this.companies = [];
    let company;

    let size = await this.firestore.collection('companies').get().toPromise().then(res => {
      return res.size
    });

    for (let i = 0; i < size; i++) {
      company = await this.firestore.collection('students').doc<company>(i.toString())
      .get()
      .toPromise()
      .then(res => {
        return {
          name: res.data().name,
          bio: res.data().bio,
          priceDiff: res.data().priceDiff
        };
      })
      .catch(e => {
        console.log("Connot get Company Data: ", e);
        return null;
      });
      this.companies.push(company);
    }

    console.log("Company Data: ", this.companies);

  }

  // TODO: Setup super-admin page to add or edit tool data


}
