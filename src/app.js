const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model')
const { getProfile } = require('./middleware/getProfile')
const app = express();
const { Op } = require("sequelize");
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

/**
 * FIX ME!
 * @returns contract by id
 */
app.get('/contracts/:id', getProfile, async (req, res) => {
    const { Contract } = req.app.get('models')
    const { id } = req.params
    const contract = await Contract.findOne({ where: { id } })
    if (!contract) return res.status(404).end()
    if (contract.ContractorId == req.get('profile_id')) {
        res.json(contract)
    }
    else {
        res.json({})
    }
})

app.get('/contracts', getProfile, async (req, res) => {
    const { Contract } = req.app.get('models')
    const user_id = req.get('profile_id')
    const contracts = await Contract.findAll({
        where: {
            [Op.or]: [
                { ContractorId: user_id },
                { ClientId: user_id }
            ],
            [Op.not]: [
                { status: "terminated" }
            ]
        }
    })
    if (!contracts) return res.status(404).end()
    res.json(contracts)
})

app.get('/jobs/unpaid', getProfile, async (req, res) => {
    const { Job } = req.app.get('models')
    const { Contract } = req.app.get('models')
    const user_id = req.get('profile_id')
    const jobs = await Job.findAll({
        where: {
            paid: null,
            [Op.or]: [
                { '$Contract.ContractorId$': user_id },
                { '$Contract.ClientId$': user_id }
            ],
            [Op.not]: [
                { '$Contract.status$': "terminated" }
            ]
        },
        include: [
            {
                model: Contract,
                as: 'Contract',
                attributes: [],
                required: false,
            }
        ]
    });
    res.json(jobs)
})

app.post('/jobs/:job_id/pay', getProfile, async (req, res) => {
    const user_id = req.get('profile_id')
    const { job_id } = req.params
    const { Profile } = req.app.get('models')
    const { Job } = req.app.get('models')
    const { Contract } = req.app.get('models')
    const client = await Profile.findOne({
        where: { id: user_id },
    })
    const contractor = await Profile.findOne({
        include: {
            model: Contract,
            as: 'Contractor',
            include: {
                model: Job,
                where: { id: job_id }
            }
        }
    })
    let client_balance = client.balance;
    let contractor_balance = contractor.balance
    const job = await Job.findOne({
        where: { id: job_id }
    })
    const price = job.price
    if (client_balance >= price) {
        client_balance -= price
        contractor_balance += price
        await client.update({ balance: client_balance })
        await contractor.update({ balance: contractor_balance })
    }
    else {
        res.json({})
    }
    res.json(contractor.balance)
})

app.post('/balances/deposit/:userId', getProfile, async (req, res) => {
    const user_id = req.get('profile_id')
    const { Profile } = req.app.get('models')
    const { Job } = req.app.get('models')
    const { Contract } = req.app.get('models')
    let total_price = 0
    const jobs = await Job.findAll({
        include: {
            model: Contract,
            as: 'Contract',
            include: {
                model: Profile,
                as: 'Client',
                where: { id: user_id }
            }
        }
    })
    jobs.forEach(job => {
        if (job.Contract === null) {
            return
        } else { total_price += job.price }
    });
    const available_amount = total_price * 0.25
    const client = await Profile.findOne({
        where: {id: user_id}
    })
    await client.update({balance: client.balance + available_amount})
    res.json(client.balance)
})

app.get('/admin/best-profession', getProfile, async (req, res) => {
    const { Contract } = req.app.get('models')
    const { Job } = req.app.get('models')
    const { start, end } = req.query
    const contracts = await Contract.findAll({
        where: {
            createdAt: {
                [Op.between]: [start, end]
            }
        },
        include: {
            model: Job,
        }
    })
    let maxProfit = -99999, totalProfit;
    contracts.sort()
    contracts.forEach((contract) => {
        totalProfit = 0;
        contract.Jobs.forEach(job => {
            if (job.paid == true) {
                totalProfit += job.price;
            }
        });
        if (maxProfit < totalProfit) {
            maxProfit = totalProfit;
        }
    });
    let result = [];
    contracts.forEach((contract) => {
        totalProfit = 0;
        contract.Jobs.forEach(job => {
            if (job.paid == true) {
                totalProfit += job.price;
            }
        });
        if (maxProfit == totalProfit) {
            result.push(contract);
        }
    });

    res.json({ result });
})

module.exports = app;
