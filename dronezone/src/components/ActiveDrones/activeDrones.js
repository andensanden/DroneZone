
class ActiveDrone {

    //-----Attributes-------

    ID = null;
    latitude = null;
    longitude = null;
    // altitude = null;
    activePath = null;

    //-----Constructor--------

    constructor(ID, latLng, activePath) {
        this.ID = ID;
        this.latitude = latLng.lat;
        this.longitude = latLng.lng;
        this.activePath = activePath;
    }

}; export default ActiveDrone;