import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function fetchCountries() {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(
        `${API_BASE_URL}/countries/all`,
        { headers }
    );
}

export function createCountry(name, manager, localFeePercentage, intFeePercentage) {
    const postData = {
        name,
        manager,
        localFeePercentage, 
        intFeePercentage
    };
    
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(
        `${API_BASE_URL}/countries/`,
        postData,
        { headers }
    );
}

export function updateCountry(post, postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.put(`${API_BASE_URL}/countries/${postId}`, post, { headers });
}

export function getCountry(postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    return axios.get(`${API_BASE_URL}/countries/${postId}`, { headers });
}

export function deleteCountry(postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.delete(`${API_BASE_URL}/countries/${postId}`, { headers });
}

export function formatCountries(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}

export function formatError(errorResponse) {
    return errorResponse.message;
}
