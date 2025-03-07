# ASTUDIO Practical Assessment

This repository was created as part of an application for **ASTUDIO Practical Assessment**. The project is built using **Next.js** (React + TypeScript).

---

## Table of Contents

1. [Overview](#overview)  
2. [Technologies Used](#technologies-used)  
3. [Integration with DummyJSON](#integration-with-dummyjson)  
4. [Features](#features)  
   - [Main Page](#main-page)  
   - [Users Page](#users-page)  
   - [Products Page](#products-page)  
5. [Usage](#usage)  
6. [Notes & Caveats](#notes--caveats)  
7. [Responsive Layout](#responsive-layout)  
8. [License](#license)

---

## Overview

This project demonstrates a simple application with two main pages in addition to the main landing page:

- `/users` – Fetches user data, includes local search, pagination, and filtering.
- `/products` – Fetches product data, includes category filtering and tabbed views.

All data is retrieved from [dummyjson.com](https://dummyjson.com/). The app is built using **React**, **TypeScript**, and **Next.js**.

A Line demo can be found : 
[astudio-task-iota.vercel.app](https://astudio-task-iota.vercel.app)

---

## Technologies Used

- **Next.js** (React + TypeScript)
- **React Hooks**
- **Axios**
- **CSS/Tailwind**

---

## Integration with DummyJSON

This application integrates with:

1. **Users** endpoint:  
   [https://dummyjson.com/docs/users](https://dummyjson.com/docs/users)

2. **Products** endpoint:  
   [https://dummyjson.com/docs/products](https://dummyjson.com/docs/products)

Requests are made from the client to retrieve the respective data.

---

## Features

### Main Page

- A simple landing page that serves as an entry point into the application.
- Provides navigation links to **Users** and **Products** pages.

### Users Page (`/users`)

- **Fetch Users**: Retrieves users data from [DummyJSON Users API](https://dummyjson.com/docs/users).
- **Local Search**: Includes a local (client-side) search, not tied to the API’s filter.
- **Pagination**: Ability to paginate results and set a custom page size.
- **Filters**:
  - **FirstName**
  - **LastName**
  - **Email**
  - **Age**

> **Important Note**: The API’s filters are case-sensitive. The exact word must be used to return results.

### Products Page (`/products`)

- **Fetch Products**: Retrieves product data from [DummyJSON Products API](https://dummyjson.com/docs/products).
- **Tab View**:  
  - **All**: Shows all products.  
  - **Laptops**: Shows only products filtered by the `category` "laptops".
- **Filter Support**: The API supports filtering only by **Category** as per the documentation.  
  - **Title** and **Brand** filters are not supported by the API.

> **Important Note**: The Filters is limited to **category** as per DummyJSON’s documentation. Filtering by **title** or **brand** does not work at the API level

---

## Usage

1. **Main Page**: Navigate to the application root to see the landing page and use the links to go to the `/users` and `/products` pages.
2. **Users Page**: Explore the user list. Try the search bar for local (client-side) filtering. Adjust pagination settings (next/previous pages, page size, etc.).
3. **Products Page**: View the products list. Switch between the **All** and **Laptops** tabs. Note that only category filtering is supported by the API.

---

## Notes & Caveats

- **API Filters** (in `/users`) is case-sensitive because the underlying API.
- **Product Filtering** is limited to **category** as per DummyJSON’s documentation. Filtering by **title** or **brand** does not work at the API level.

---

## Responsive Layout

The application layout is designed to adapt seamlessly to both laptop/desktop and mobile devices.

---

## License

This project is for assessment purposes. If you plan to reuse any part of it, please check with the original author/organization regarding licensing.
