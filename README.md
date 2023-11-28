# Workfully Code Challenge

### Installation

1. Install dependencies.
```bash
npm install
```
2. Create database
```bash
docker-compose up -d
```

3. Build project
```bash
npm run build
```

4. Run project
```bash
npm start
```

### Testing

1. Run tests.
```bash
npm test
```


# Bank Account API

### Deposit

`/api/deposit` -> **accountId** and **amount** as parameters 

### Withdrawal

`/api/withdraw` -> **accountId** and **amount** as parameters

### Transfer

`/api/transfer` -> **fromAccountId** **toAccountId** and **amount** as parameters

## Considerations 
* Deposits can not be above $5000 per day.
* Withdrawal supports a $200 overdraft (balance, can be down to -$200).
* Transfers don’t support overdrafts (can’t leave the balance below 0).
