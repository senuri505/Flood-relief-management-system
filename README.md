# Flood Relief Management System

A web-based application designed to support the collection and management of basic data during flood situations in Sri Lanka.  
This system allows affected individuals to register, submit flood relief requests, and enables administrators to manage users and monitor relief data through summarized reports.

---

## Project Description

During flood emergencies in Sri Lanka, timely and organized relief management is crucial.  
This web-based Flood Relief Management System provides a **centralized platform** to:

- Collect basic data from affected individuals  
- Allow self-registration and login for users  
- Enable affected persons to submit, view, update, and delete relief requests  
- Provide administrators with tools to manage users and generate summarized reports  

The system implements **role-based access control** to ensure security and proper authorization.

---

## Technology Stack (Mandatory)

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** PHP (without frameworks)  
- **Database:** MySQL (managed via phpMyAdmin)

---

## Functional Requirements

### 1. User Authentication (All Users)
- Self-registration (Sign Up / Sign In)  
- Login and Logout functionality  
- Role-based access control:
  - **Administrator**: Full control over system data and users  
  - **Affected Person (User)**: Can submit and manage their own relief requests

  ---

### 2. Relief Request Management (Affected Person Role)

An authenticated user (affected person) can submit and manage flood relief requests.

#### 📌 Relief Request Details

Each request includes:

* **Type of relief:** Food / Water / Medicine / Shelter
* **Location details:**

  * District
  * Divisional Secretariat
  * GN Division
* **Household details:**

  * Contact person name
  * Contact number
  * Address
  * Number of family members
* **Flood severity level:**

  * Low
  * Medium
  * High
* **Description** *(special or additional requirements)*

#### 🔧 User Capabilities

* Create a new relief request
* View their own requests
* Update request details
* Delete a request

---

### 3. User Management & Reporting (Admin Role)

The administrator has full control over system data and users.

#### 3.1 View Registered Users

* View all users in the system
* Select a user to view detailed information
* Display data in a structured format

---

#### 3.2 System Summary & Filtered Reports

The system provides dynamic reports based on selected filters.

##### 🔍 Filtering Options:

* By Area
* By Type of Relief Request

##### 📊 Example Summary:

* Total Registered Users
* High Severity Households
* Food Requests
* Medicine Requests

#### ⚙️ Report Features:

* Generated using MySQL queries
* Automatically updated when data changes
* Displayed as structured HTML pages

---

#### 3.3 Delete Users

* Admin can remove users from the system when necessary

---

## Report Requirement

* Reports are displayed as formatted HTML pages
* Must be:

  * Clear
  * Well-structured
  * Easy to read

---

## Additional Features

* Confirmation pop-up messages for user actions

### ✅ Example:

> "Your relief request has been created successfully."

---

## System Behavior

* Role-based access control ensures secure functionality
* Users can only access their own data
* Admin has full access to system data and controls

---
