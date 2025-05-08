
class ActiveDrone {

    //-----Attributes-------

    id = null;
    lat = null;
    lng = null;
    heading = null;
    altitude = null;
    activePath = null;

    //-----Constructor--------

    constructor(id, latLng, heading, altitude, activePath) {
        this.id = id;
        this.lat = latLng.lat;
        this.lng = latLng.lng;;
        this.heading = heading;
        this.altitude = altitude;
        this.activePath = activePath;
    }

}; export default ActiveDrone;