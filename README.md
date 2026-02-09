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