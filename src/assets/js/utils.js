function displayError(_this, status, msg) {
    let errors = {
        500: '服务器内部错误',
    }
    if ('$message' in _this) {
        if (status in errors) {
            _this.$message({
                message: errors[status],
                type: 'error'
            })
        } else if (msg) {
            _this.$message({
                message: msg,
                type: 'error'
            })
        } else {
            _this.$message({
                message: '未知错误，联系系统管理员',
                type: 'error'
            })
        }
    } else {
        alert(errors[status])
    }
}

function displaySuccess(_this, msg) {
    if ('$message' in _this) {
        _this.$message({
            message: msg,
            type: 'success'
        })
    }
}

function post(_this, targetUrl, data = '', callbackSuccess = null, callbackError = null, callbackAll = null) {
    if (!('$axios' in _this)) {
        throw new Error('The $axios is not a property of vue instence.')
    }
    if (!('$z' in _this)) {
        throw new Error('The $z is not a property of vue instence.')
    }
    let dataStr = data && Object.keys(data).length > 0 && _this.$z.axios.urlEncode(data)
    _this.$axios.post(targetUrl, dataStr)
    .then(res => {
        callbackAll && callbackAll()
        if (res.status != 200) {
            displayError(_this, res.status)
            return
        }
        let data = res.data
        if (data.code) {
            callbackSuccess && callbackSuccess(data.data)
        } else {
            displayError(_this, null, data.errorMsg)
            callbackError && callbackError()
        }
    })
    .catch(() => {
        callbackAll && callbackAll()
    })
}

export default {
    displayError,
    displaySuccess,
    post,
}
