import axios from 'axios';

export function fetchUsers() {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(
        `https://modoupay-api.onrender.com/api/users/all`,
        { headers }
    );
}

export function createUser(firstName, lastName, login, role, phoneNumber, email, password) {
    const postData = {
        firstName, 
        lastName, 
        login, 
        role, 
        phoneNumber,
        email,
        password,
    };
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(
        `https://modoupay-api.onrender.com/api/users`,
        postData,
        { headers }
    );
}

export function createClient(firstName, lastName, role, phoneNumber) {
    const postData = {
        "firstName": firstName, 
        "lastName": lastName, 
        "login": generateRandomPassword(6), 
        "role": role, 
        "phoneNumber": phoneNumber,
        "password": generateRandomPassword(12),
    };
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(
        `https://modoupay-api.onrender.com/api/users`,
        postData,
        { headers }
    );
}

export function updateUser(post, postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.put(`https://modoupay-api.onrender.com/api/users/${postId}`, post, { headers });
}

export function deleteUser(postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.delete(`https://modoupay-api.onrender.com/api/users/${postId}`, { headers });
}

export function formatUsers(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}

export function formatError(errorResponse) {
    return errorResponse.message;
}

function generateRandomPassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    let password = '';
  
    for (let i = 0; i < length; ++i) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    return password;
  }
