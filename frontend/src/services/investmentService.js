import axios from 'axios';

const API_BASE_URL = "https://biba-4c47ebf435ea.herokuapp.com/api";

export function fetchInvestments() {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(
        `${API_BASE_URL}/investments/`,
        { headers }
    );
}

export function createInvestment(name, phoneNumber, email, selectedCountries, amountInvested,
    interestPercentage) {
    const postData = {
        name, 
        phoneNumber,
        email,
        selectedCountries,
        amountInvested,
        interestPercentage
    };
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(
        `${API_BASE_URL}/investments/`,
        postData,
        { headers }
    );
}

export function updateInvestment(post, postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.put(`${API_BASE_URL}/investments/${postId}`, post, { headers });
}

export function deleteInvestment(postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.delete(`${API_BASE_URL}/investments/${postId}`, { headers });
}

export function formatInvestments(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}

export function formatError(errorResponse) {
    return errorResponse.message;
}