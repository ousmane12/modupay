import axiosInstance from '../services/AxiosInstance';

export function getTransactions() {
    return axiosInstance.get(`posts.json`);
}

export function createTransaction(postData) {
    return axiosInstance.post(`posts.json`, postData);
}

export function updateTransaction(post, postId) {
    return axiosInstance.put(`posts/${postId}.json`, post);
}

export function deleteTransaction(postId) {
    return axiosInstance.delete(`posts/${postId}.json`);
}

export function formatTransactions(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}
