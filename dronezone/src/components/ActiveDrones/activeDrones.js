
class ActiveDrone {

    //-----Attributes-------

    id = null;
    lat = null;
    lng = null;
    heading = null;
    altitude = null;
    activePath = null;

    //-----Constructor--------

    constructor(id, lat, lng, heading, altitude, activePath) {
        this.id = id;
        this.lat = lat;
        this.lng = lng;;
        this.heading = heading;
        this.altitude = altitude;
        this.activePath = activePath;
    }

}; export default ActiveDrone;