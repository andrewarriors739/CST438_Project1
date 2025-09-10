# CST438_Project1
Team members: Mariana Duran, Andre Gutierrez , Janniel Tan, Sebastian Ramos

Repository for the first project in CST 448.


First week: Did frontend of the homepage, had placeholders for the data
Second week: Replaced the placeholders with actual data from the API.


## Running Tests

This project includes unit tests for the Teams component. To run the tests:

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npm test teams.test.js
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with coverage
```bash
npm test -- --coverage
```

### Test Files
- `test/teams.test.js` - Tests for the Teams component including:
  - API integration tests for all sports (basketball, soccer, football, baseball, hockey)
  - UI rendering tests
  - User interaction tests (team clicks)
  - Error handling tests
  - Data extraction and display tests
