import { Router } from "express";
import CONNECTION, {
    acknowledgeDesktopIfNotPingedRecentlyByMobile,
    getNewUniqueConnectionId,
} from "./connections";
import { askDesktopToShowNotificationScreen, emitNotification } from "./socket";

const apiRouter = Router();

// for web
apiRouter.get("/new-id", (req, res) => {
    try {
        const newId = getNewUniqueConnectionId();
        res.status(200).json({ id: newId }).end();
    } catch (error) {
        console.log("[ERROR] /new-id", error);
        res.status(200)
            .json({
                error: "Something went wrong",
            })
            .end();
    }
});

// for mobile
apiRouter.post("/verify-id-and-connect", (req, res) => {
    try {
        const { id } = req.body;
        const connection = CONNECTION.getConnection(id);
        if (!connection) {
            return res
                .status(200)
                .json({ error: "No Desktop Opened With This Code" })
                .end();
        }
        res.status(200).json({ message: "Connected" }).end();
        askDesktopToShowNotificationScreen(id);
        acknowledgeDesktopIfNotPingedRecentlyByMobile(id);
    } catch (error) {
        console.log("[ERROR] /verify-id-and-connect", error);
        res.status(200).json({ error: "Something went wrong" }).end();
    }
});

apiRouter.post("/polling-from-mobile", (req, res) => {
    try {
        const { id } = req.body;
        const connection = CONNECTION.getConnection(id);
        if (!connection) {
            return res
                .status(200)
                .json({ error: "No Desktop Opened With This Code" })
                .end();
        }
        CONNECTION.updateMobileLastPing(id);
        res.status(200).json({ message: "OK" }).end();
    } catch (error) {
        console.log("[ERROR] /polling", error);
        res.status(200).json({ error: "Something went wrong" }).end();
    }
});

apiRouter.post("/notification", (req, res) => {
    try {
        const { id, notification } = req.body;
        emitNotification(id, notification);
        res.status(200).json({ message: "Notification sent" }).end();
    } catch (error) {
        console.log("[ERROR] /api/notification", error);
        res.status(200).json({ error: "Something went wrong" }).end();
    }
});

export default apiRouter;
