export const successNotification = (message) => ({ message: message, options: { type: 'success', icon: "check-circle-fill" }});
export const warningNotification = (message) => ({ message: message, options: { type: 'danger', icon: "dash-circle-fill" }});
export const dangerNotification = (message) => ({ message: message, options: { type: 'warning', icon: 'exclamation-circle-fill' }});
