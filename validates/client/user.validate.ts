import { Request, Response, NextFunction } from "express";

export const registerPost = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.fullName == "") {
        res.redirect('back')
        return;
    }
    if (req.body.email == "") {
        res.redirect('back')
        return;
    }
    if (req.body.password == "") {
        res.redirect('back')
        return;
    }
    next()
}

export const loginPost = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.email == "") {
        res.redirect('back')
        return;
    }
    if (req.body.password == "") {
        res.redirect('back')
        return;
    }
    next()
}

export const forgotPassword = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.email == "") {
        res.redirect('back')
        return;
    }
    
    next()
}

export const passwordResetPost = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password == "") {
        res.redirect('back')
        return;
    }

    if (req.body.confirmPassword == "") {
        res.redirect('back')
        return;
    }

    if (req.body.password != req.body.confirmPassword) {
        res.redirect('back')
        return;
    }
    
    next()
}

export const updateInfoPost = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.fullName == "") {
        res.redirect('back')
        return;
    }
    if (req.body.email == "") {
        res.redirect('back')
        return;
    }
    // if (req.body.oldPassword != "") {
    //     if (req.body.newPassword == "") {
    //         res.redirect('back')
    //         return;
    //     }
    // }
    
    next()
}