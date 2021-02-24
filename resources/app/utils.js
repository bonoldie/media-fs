// Utils 

export const successNotification = (message) => ({ message: message, options: { type: 'success', icon: "check-circle-fill" } });
export const warningNotification = (message) => ({ message: message, options: { type: 'danger', icon: "dash-circle-fill" } });
export const dangerNotification = (message) => ({ message: message, options: { type: 'warning', icon: 'exclamation-circle-fill' } });

// Convert serialized text to Blob (from FileReader.readAsDataURL)
export const textToBlob = (serializedDataURL) => {
    if (serializedDataURL) {
        var mimeType = serializedDataURL.split(RegExp("[:;,]"))[1];
        var data = atob(serializedDataURL.split(RegExp("[:;,]"))[3]);

        var arrayBuffer = new ArrayBuffer(data.length);
        var raw_data = new Uint8Array(arrayBuffer);
        for (var i = 0; i < data.length; i++) {
            raw_data[i] = data.charCodeAt(i);
        }

        var dataView = new DataView(arrayBuffer);

        return new Blob([dataView], { type: mimeType });
    }

    return null
}

export const downloadFile = (blob,filename) => {
    if (blob) {
        const _link = document.createElement('a')

        _link.href = URL.createObjectURL(blob);
        _link.download = filename;

        setTimeout(() => {
            _link.click();
        }, 100)
    }
}