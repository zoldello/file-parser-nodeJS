File Parser in node.js
==================================================

How to set up
--------------------------------------
- Get Node.js
- Get dependencies by running:
```bash
 npm insall
```

How to Test and Link
--------------------------------------
- Run:
```bash
 gulp
```

How to use
--------------------------------------
- Run:
```bash
node index someFile.txt
```

where someFile.txt is a comma, space or piple separated file

- To run GET API,  use there in a browser:
    - http://localhost:8081/records/name
    - http://localhost:8081/records/gender
    - http://localhost:8081/records/birthdate


- To run POST Restful API,
-- you can use chrome extention's [POSTMASTER](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) or some other POST controller

-- Add a query string in this format:
lastName, firstName, gender, favoriteColor, birthDay


For example:
Jackson,  Michael,  Male, Blue,  08/25/1958
