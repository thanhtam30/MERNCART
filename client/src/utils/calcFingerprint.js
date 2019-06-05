import Fingerprint2 from 'fingerprintjs2';

const calcFingerprint = function (callback) {
    Fingerprint2.get(function (components) {
        var murmur = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31)

        callback(murmur);
    })
}

export default calcFingerprint;