
class ActiveDrone {

    //-----Attributes-------

    ID = null;
    longitude = null;
    latitude = null;
    // altitude = null;
    activePath = null;

    //-----Constructor--------

    constructor(ID, activePath) {
        this.ID = ID;
        this.activePath = activePath;
    }

}; export default ActiveDrone;