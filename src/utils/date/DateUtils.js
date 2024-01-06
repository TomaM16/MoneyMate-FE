export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};
  
export const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleTimeString(undefined, options);
};