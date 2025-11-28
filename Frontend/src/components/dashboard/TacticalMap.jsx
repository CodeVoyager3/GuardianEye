import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issues in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const TacticalMap = ({ threats = [], onNeutralize }) => {
    const center = [28.61, 77.20]; // New Delhi

    const getThreatIcon = (threat) => {
        const isVerified = threat.isZyndVerified;
        const color = '#FF0000'; // Always Red

        return new L.DivIcon({
            className: 'custom-icon',
            html: `
            <div class="relative flex items-center justify-center w-12 h-12">
                ${!isVerified ? `<div class="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold bg-red-600 text-white px-1 whitespace-nowrap z-50">⚠️ SIG MISMATCH</div>` : ''}
                
                <div class="w-6 h-6 border-2 flex items-center justify-center relative z-10 ${!isVerified ? 'animate-bounce' : ''}" style="border-color: ${color}; background-color: ${color}20; box-shadow: 0 0 10px ${color}; border-radius: 50%;">
                    <div style="width: 8px; height: 8px; background-color: ${color}; border-radius: 50%;"></div>
                </div>
            </div>`,
            iconSize: [48, 48],
            iconAnchor: [24, 24],
            popupAnchor: [0, -24]
        });
    };

    return (
        <div className="w-full h-full relative border border-[#333] overflow-hidden">
            <MapContainer
                center={center}
                zoom={10}
                style={{ height: '100%', width: '100%', background: '#000' }}
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="map-tiles"
                    style={{ filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                />

                {threats.map((threat, index) => (
                    <Marker
                        key={index}
                        position={[threat.lat, threat.lng]}
                        icon={getThreatIcon(threat)}
                    >
                        <Popup className="tactical-popup">
                            <div className="bg-black text-[#00FFFF] border border-[#00FFFF] p-2 font-mono text-xs">
                                <h3 className="font-bold border-b border-[#00FFFF]/30 mb-1">{threat.id}</h3>
                                <p>TYPE: {threat.type}</p>
                                <p>STATUS: {threat.status}</p>
                                <p className={threat.isZyndVerified ? "text-green-400" : "text-red-500 font-bold"}>
                                    {threat.isZyndVerified ? "VERIFIED" : "SPOOF DETECTED"}
                                </p>
                                <button
                                    onClick={() => onNeutralize && onNeutralize(threat.id)}
                                    className="mt-2 w-full bg-[#00FFFF]/20 hover:bg-[#00FFFF]/40 text-[#00FFFF] border border-[#00FFFF] py-1 text-[10px] uppercase tracking-wider transition-colors"
                                >
                                    NEUTRALIZE
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Overlay Elements */}
            <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
                <div className="text-[#00FFFF] font-mono text-xs bg-black/50 px-2 py-1 border border-[#00FFFF]/30 backdrop-blur-sm">
                    COORDS: 28.61° N, 77.20° E
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00FFFF] z-[1000] pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00FFFF] z-[1000] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00FFFF] z-[1000] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00FFFF] z-[1000] pointer-events-none" />

            <style>{`
                .leaflet-container {
                    background: #000 !important;
                }
                .map-tiles {
                    filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
                }
                .tactical-popup .leaflet-popup-content-wrapper {
                    background: transparent;
                    box-shadow: none;
                    padding: 0;
                    border-radius: 0;
                }
                .tactical-popup .leaflet-popup-tip {
                    background: #000;
                    border: 1px solid #00FFFF;
                }
            `}</style>
        </div>
    );
};

export default TacticalMap;
