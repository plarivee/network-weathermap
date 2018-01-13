import axios from 'axios';

export const VIEW_ALL_FULL = 'VIEW_ALL_FULL';
export const VIEW_FIRST_FULL = 'VIEW_FIRST_FULL';
export const VIEW_THUMBS = 'VIEW_THUMBS';
export const SET_MAP_DATA = 'SET_MAP_DATA';
export const SET_GROUP_DATA = 'SET_GROUP_DATA';

export function loadMaps() {
    // TODO -- this base URL should come from the settings
    let url = "http://localhost:8016/cacti/plugins/weathermap/weathermap-cacti10-plugin.php?action=maplist";

    return (dispatch) => {
        axios.get(url).then((response) => {
            dispatch(setGroups(response.data.groups));
            dispatch(setMaps(response.data.maps));
        })
    }
}

export function setMaps(map_data) {
    return {
        type: SET_MAP_DATA,
        maps: map_data
    }
}

export function setGroups(group_data) {
    return {
        type: SET_GROUP_DATA,
        groups: group_data
    }
}

export function viewAllFull() {
    return {type: VIEW_ALL_FULL}
}

export function viewFirstFull() {
    return {type: VIEW_FIRST_FULL}
}

export function viewThumbs() {
    return {type: VIEW_THUMBS}
}
