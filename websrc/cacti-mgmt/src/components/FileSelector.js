import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

class FileSelector extends Component {

    constructor() {
        super();

        this.state = {files: [], loaded: false, show_used: false};
    }

    componentDidMount() {

        // fake an API call for now
        setTimeout(function () {
            this.setState((prevState, props) => {
                return {
                    ...prevState,
                    loaded: true,
                    files: [["096-test-2.conf", "0.96 Test Map", []], ["template-debug.conf", "0.96 Test Map", []], ["switch-status.conf", "(no title)", ["USED"]], ["torture-with-imaps.conf", "(no title)", []], ["lacour-bug.conf", "(no title)", []], ["096-test.conf", "0.96 Test Map {map:titleextra}", []], ["097-test.conf", "0.96 Test Map {map:titleextra}", []], ["torture.conf", "(no title)", []], ["094-test.conf", "Testing THold DS", []], ["weathermap.conf", "(no title)", []], ["095-test.conf", "0.95 Test Map", []], ["switch-status-2.conf", "same map as switch-status.conf, but with every port scaled", []], ["097-simple.conf", "0.97 DS changes", ["USED"]], ["093-test.conf", "scriptalert(document.cookie);\/script", ["USED"]], ["test-bg.png", "(no title)", []], ["icon-scale-tag.conf", "(no title)", []], ["timezones.conf", "(no title)", []], ["simple.conf", "Simple Map 3", ["USED"]]]
                };
            });
        }.bind(this), 2000);

        this.toggleHideUsed = this.toggleHideUsed.bind(this);

    }

    toggleHideUsed() {
        this.setState((prevState, props) => {
            return {
                ...prevState,
                show_used: !prevState.show_used
            }
        });
    }

    render() {

        let contents = null;

        if (this.state.loaded) {

            const visible_maps = this.state.files.filter((file) => {

                return this.state.show_used || !file[2].includes('USED');
            });

            const maplist = visible_maps.map((item, index) => {
                    return (<tr key={index}>
                        <th><input type="checkbox"/>
                            {item[0]}</th>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                    </tr>)
                }
            );

            contents = <div>
                <p>This is the popup file picker (data is hardcoded JSON - API does exist though)</p>
                <p>
                    <button
                        onClick={this.toggleHideUsed}>{this.state.show_used ? "HIDE USED" : "INCLUDE USED"}</button>
                </p>

                <table className="wm-picker">
                    <thead>
                    <tr>
                        <th><FormattedMessage id="config_file" defaultMessage="Config File"/></th>
                        <th><FormattedMessage id="title" defaultMessage="Title"/></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {maplist}
                    </tbody>
                </table>
                <button><FormattedMessage id="add_selected" defaultMessage="Add Selected Maps"/></button>
                <button><FormattedMessage id="cancel" defaultMessage="Cancel"/></button>
            </div>
        } else {
            contents = <div>Loading</div>
        }

        return <div className='wm-picker-container  wm-popup'>
            {contents}
        </div>


    }
}

export default FileSelector;