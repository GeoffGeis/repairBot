function Suspect(status) {
    this.status = status;
    this.post = !!Math.floor(Math.random() * 2);
    this.hddAccess = !!Math.floor(Math.random() * 2);
    this.hddMount = !!Math.floor(Math.random() * 2);
    this.userAccount = !!Math.floor(Math.random() * 2);
    this.networking = !!Math.floor(Math.random() * 2);
    this.browserDownloads = !!Math.floor(Math.random() * 2);
    this.recoveryPartition = !!Math.floor(Math.random() * 2);
    this.update = !!Math.floor(Math.random() * 2);
}

function Repair() {
    this.queue = [];
    for(var i in arguments) {
        this.queue.push(arguments[i]);
    }
}

Repair.prototype.sort = function() {
    var pass = false;
    for(var i in this.queue) {
        if(this.queue[i].status[0] === "dbu") {
            this.dbu(i);
        } else if(this.queue[i].status[0] === "adr") {
            this.aju(i);
        } else if(this.queue[i].status[0] === "restore") {
            pass = this.restore(i);
            if(pass) {
                this.queue[i].status.splice(0, 1);
                this.queue[i].status.push("postops");
            } else {
                this.queue[i].status.splice(0, 1);
                this.queue[i].status.push("service");
            }
        } else if(this.queue[i].status[0] === "postops") {
            pass = this.postOps(i);
            if(pass) {
                this.queue[i].status.splice(0, 1);
                this.queue[i].status.push("complete");
            } else {
                pass = this.restore(i);
                if(pass) {
                    this.queue[i].status.splice(0, 1);
                    this.queue[i].status.push("complete");
                } else {
                    this.queue[i].status.splice(0, 1);
                    this.queue[i].status.push("service");
                }
            }
        } else {
            console.log(this.queue[i].status);
            this.queue.splice(0, 1);
        }
    }
};

Repair.prototype.dbu = function(index) {
    var pass = false;
    if(this.queue[index].post) {
        if(this.queue[index].userAccount) {
            console.log("dbu complete!");
            this.queue[index].status.splice(0, 1);
        } else {
            pass = this.peMode(index);
            if(pass) {
                console.log("dbu complete!");
                this.queue[index].status.splice(0, 1);
            } else {
                this.queue[index].status.splice(0, 1);
            }
        }
    } else {
        if(this.queue[index].hddAccess) {
            if(this.queue[index].hddMount) {
                console.log("dbu complete!");
                this.queue[index].status.splice(0, 1);
            } else {
                this.queue[index].status.splice(0, 1);
            }
        } else {
            this.queue[index].status.splice(0, 1);
        }
    }
};

Repair.prototype.openSuspect = function() {
    
};

Repair.prototype.aju = function(index) {
    var pass = false;
    if(this.queue[index].post) {
        if(this.queue[index].userAccount) {
            if(this.queue[index].networking) {
                if(this.queue[index].browserDownloads) {
                    console.log("connected to aju!");
                    this.queue[index].status.splice(0, 1);
                    this.queue[index].status.push("postops");
                } else {
                    pass = this.peMode(index);
                    if(pass) {
                        console.log("FACE complete!");
                        this.queue[index].status.splice(0, 1);
                        this.queue[index].status.push("postops");
                    } else {
                        this.queue[index].status.splice(0, 1);
                        this.queue[index].status.push("service");
                    }
                }
            } else {
                pass = this.peMode(index);
                if(pass) {
                    console.log("FACE complete!");
                    this.queue[index].status.splice(0, 1);
                    this.queue[index].status.push("postops");
                } else {
                    this.queue[index].status.splice(0, 1);
                    this.queue[index].status.push("service");
                }
            }
        } else {
            pass = this.peMode(index);
            if(pass) {
                console.log("FACE complete!");
                this.queue[index].status.splice(0, 1);
                this.queue[index].status.push("postops");
            } else {
                this.queue[index].status.splice(0, 1);
                this.queue[index].status.push("service");
            }
        }
    } else {
        this.queue[index].status.splice(0, 1);
        this.queue[index].status.push("service");
    }
};

Repair.prototype.peMode = function(index) {
    var pass = false;
    if(this.queue[index].hddMount) {
        pass = true;
        return pass;
    } else {
        pass = false;
        return pass;
    }
};

Repair.prototype.restore = function(index) {
    var pass = false;
    if(this.queue[index].recoveryPartition) {
        pass = true;
        return pass;
    } else {
        return pass;
    }
};

Repair.prototype.postOps = function(index) {
    var pass = false;
    if(this.queue[index].networking) {
        if(this.queue[index].update) {
            pass = true;
            return pass;
        } else {
            return pass;
        }
    } else {
        return pass;
    }
};

var suspect1 = new Suspect(["adr"]);
var suspect2 = new Suspect(["dbu", "adr"]);
var suspect3 = new Suspect(["dbu", "restore"]);
var repair = new Repair(suspect1, suspect2, suspect3);
repair.sort();