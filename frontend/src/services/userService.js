import axiosInstance from '../services/AxiosInstance';

export function getUsers() {
    return axiosInstance.get(`posts.json`);
}

export function createUser(postData) {
    return axiosInstance.post(`posts.json`, postData);
}

export function updateUser(post, postId) {
    return axiosInstance.put(`posts/${postId}.json`, post);
}

export function deleteUser(postId) {
    return axiosInstance.delete(`posts/${postId}.json`);
}

export function formatUsers(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}
