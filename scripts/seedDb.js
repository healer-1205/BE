const { Profile, Contract, Job } = require('../src/model');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await Profile.sync({ force: true });
  await Contract.sync({ force: true });
  await Job.sync({ force: true });
  //insert data
  await Promise.all([
   Profile.create({
      id: 1,
      firstName: 'Harry',
      lastName: 'Potter',
      profession: 'Wizard',
      balance: 1150,
      type:'client'
    }),
    Profile.create({
      id: 2,
      firstName: 'Mr',
      lastName: 'Robot',
      profession: 'Hacker',
      balance: 231.11,
      type:'client'
    }),
    Profile.create({
      id: 3,
      firstName: 'John',
      lastName: 'Snow',
      profession: 'Knows nothing',
      balance: 451.3,
      type:'client'
    }),
    Profile.create({
      id: 4,
      firstName: 'Ash',
      lastName: 'Kethcum',
      profession: 'Pokemon master',
      balance: 1.3,
      type:'client'
    }),
    Profile.create({
      id: 5,
      firstName: 'John',
      lastName: 'Lenon',
      profession: 'Musician',
      balance: 64,
      type:'contractor'
    }),
    Profile.create({
      id: 6,
      firstName: 'Linus',
      lastName: 'Torvalds',
      profession: 'Programmer',
      balance: 1214,
      type:'contractor'
    }),
    Profile.create({
      id: 7,
      firstName: 'Alan',
      lastName: 'Turing',
      profession: 'Programmer',
      balance: 22,
      type:'contractor'
    }),
    Profile.create({
      id: 8,
      firstName: 'Aragorn',
      lastName: 'II Elessar Telcontarvalds',
      profession: 'Fighter',
      balance: 314,
      type:'contractor'
    }),
    Contract.create({
      id:1,
      terms: 'bla bla bla',
     status: 'terminated',
      ClientId: 1,
      ContractorId:5
    }),
    Contract.create({
      id:2,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 1,
      ContractorId: 6
    }),
    Contract.create({
      id:3,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 2,
      ContractorId: 6
    }),
    Contract.create({
      id: 4,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 2,
      ContractorId: 7
    }),
    Contract.create({
      id:5,
      terms: 'bla bla bla',
      status: 'new',
      ClientId: 3,
      ContractorId: 8
    }),
    Contract.create({
      id:6,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 3,
      ContractorId: 7
    }),
    Contract.create({
      id:7,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 4,
      ContractorId: 7
    }),
    Contract.create({
      id:8,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 4,
      ContractorId: 6
    }),
    Contract.create({
      id:9,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 4,
      ContractorId: 8
    }),
    Job.create({
      description: 'work',
      price: 200,
      ContractId: 1,
    }),
    Job.create({
      description: 'work',
      price: 201,
      ContractId: 2,
    }),
    Job.create({
      description: 'work',
      price: 202,
      ContractId: 3,
    }),
    Job.create({
      description: 'work',
      price: 200,
      ContractId: 4,
    }),
    Job.create({
      description: 'work',
      price: 200,
      ContractId: 7,
    }),
    Job.create({
      description: 'work',
      price: 2020,
      paid:true,
      paymentDate:'2020-08-15T19:11:26.737Z',
      ContractId: 7,
    }),
    Job.create({
      description: 'work',
      price: 200,
      paid:true,
      paymentDate:'2020-08-15T19:11:26.737Z',
      ContractId: 2,
    }),
    Job.create({
      description: 'work',
      price: 200,
      paid:true,
      paymentDate:'2020-08-16T19:11:26.737Z',
      ContractId: 3,
    }),
    Job.create({
      description: 'work',
      price: 200,
      paid:true,
      paymentDate:'2020-08-17T19:11:26.737Z',
      ContractId: 1,
    }),
    Job.create({
      description: 'work',
      price: 200,
      paid:true,
      paymentDate:'2020-08-17T19:11:26.737Z',
      ContractId: 5,
    }),
    Job.create({
      description: 'work',
      price: 21,
      paid:true,
      paymentDate:'2020-08-10T19:11:26.737Z',
      ContractId: 1,
    }),
    Job.create({
      description: 'work',
      price: 21,
      paid:true,
      paymentDate:'2020-08-15T19:11:26.737Z',
      ContractId: 2,
    }),
    Job.create({
      description: 'work',
      price: 121,
      paid:true,
      paymentDate:'2020-08-15T19:11:26.737Z',
      ContractId: 3,
    }),
    Job.create({
      description: 'work',
      price: 121,
      paid:true,
      paymentDate:'2020-08-14T23:11:26.737Z',
      ContractId: 3,
    }),
    
  ]);
}
