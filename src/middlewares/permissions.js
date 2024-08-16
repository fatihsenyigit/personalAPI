
'use strict'

module.exports = {
    isLogin: (req, res, next) => {

        if (req.user && req.user.isActive) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('no permission, you must login')
        }

    },

    isAdmin: (req, res, next) => {
        if (req.user && req.user.isActive && req.user.isAdmin) {
            next()
        } else {
            res.errorStatusCode = 403 
            throw new Error('no permission, you must login and be admin')
        }
    },

    isAdminorLead: (req, res, next) => {
        if(req.user && req.user.isActive && (req.user.isAdmin || (req.user.isLead && req.user.departmentId == departmentId))) {
            next()
        } else {
            res.errorStatusCode = 403;
            throw new Error("no permission, you must login and be admin or be lead (own department)");
        }
    }
}