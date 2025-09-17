
# Store Admin

Store Admin is a comprehensive admin panel for online stores that operate through social networks. The project is built using .NET Core for backend services and React for the frontend. It's styled and made responsive using Material-UI, and integrates with an MS SQL database for data storage.

## Features

- **Store**: A centralized location where all the store settings and information can be updated. Exclusive to admin users.
  
- **Sales Analytics**: View detailed sales analytics for specific time ranges, giving insights on how many specific items were sold.
  
- **Item Analytics**: Gain a deeper understanding of individual product performance over a given number of months.
  
- **Inventory**: Oversee all the items in the inventory. Manage prices, stock levels, and other relevant item details.
  
- **Customer Orders**: Monitor, update, and manage all customer orders. Features include:
  - Update order status with notifications to customers.
  - Automatically send confirmation mails upon order status updates.
  - Provide tracking codes to customers.
  - Print shipping labels based on customer information.
  
- **Supplier Orders**: Handle all orders from suppliers, with a feature to get autmatic reminder emails two days before the order's dispute date.
  
- **Promo Codes**: Create, update, or delete promotional codes which customers can use for discounts on their orders.
  
- **Employees**: An admin-exclusive feature to manage all employees. Grant them read/write privileges for various objects, enabling them to perform or view certain actions based on their role.
  
- **Categories**: Handle the different categories associated with products, facilitating easier item organization.

## Requirements

To run the Store Admin:

1. **.NET Core SDK**: Ensure you have the latest .NET Core SDK installed.
  
2. **Node.js & npm**: As the frontend is developed using React, you need Node.js and npm for dependency management and running the project.
  
3. **MS SQL Server**: Ensure that the MS SQL server is set up and the connection string in the application's configuration is correctly pointing to the database.

## How to Run

1. **Backend**:
 **Backend**:
    - Navigate to the .NET Core solution directory.
    - Use the command `dotnet restore` to restore dependencies for all projects in the solution.
    - If you have a specific order to start projects or if they need to run simultaneously, mention that. For example:
        - Start the API project: `dotnet run --project ./WebApi/WebApi.csproj`
        - In a new terminal, start another service: `dotnet run --project ./PathToAnotherService/AnotherService.csproj`
    - If there's a single project to run, or a main project that runs others: `dotnet run --project ./PathToMainProject/MainProject.csproj`

**Note:** its much easier just to run it from Visual Studio


2. **Frontend**:
    - Navigate to the React project directory.
    - Install the dependencies using `npm install`.
    - Start the development server with `npm start`.

3. Open your browser and navigate to the frontend URL (by default, it should be `http://localhost:3000` unless specified otherwise).

## User Roles

There are two primary user roles:

- **Admin**: Has unrestricted access to all features(Needs to be programaticlly added to a db).

Isnert Admin query:
```
INSERT INTO Employees
           ([Id]
           ,[Name]
           ,[LastName]
           ,[Usermame]
           ,[Email]
           ,[Password]
           ,[StoreId]
           ,[Role]
           ,[IsDeleted])
     VALUES
           (<guid>,<your name>,<your lastname>,<your email(prefferablly valid)>,<bycripted password>
           ,<can be added later(ef core addition)>,0,false)
```
- **Employee**: Access is restricted based on the given permissions for various objects.



