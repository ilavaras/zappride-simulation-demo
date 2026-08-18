(function(w){
const K='zappride_demo_state_v1';
const seed={booking:{bookingId:'ZP-BK-1001',customerName:'Arun K',route:'Pallikaranai → Chennai One',status:'BOOKED',otp:'4821',fare:320},
vehicle:{vehicleId:'ZP-EV-014',status:'RESERVED',battery:92,lat:12.939,lng:80.209,node:'Pallikaranai'},
trip:{tripId:'TR-2408',status:'NOT_STARTED',progressPct:0,speedKph:0,elapsedSec:0},
telemetry:{eventRatePerMin:3820,totalEvents:0,lastEventAt:null,apiP95Ms:176},
payment:{status:'PENDING',amount:320,method:'UPI'},
settlement:{status:'PENDING',investorShare:48},
investor:{portfolioEarnings:42300,tripEarning:0},events:[]};
const cp=x=>JSON.parse(JSON.stringify(x)), now=()=>new Date().toISOString();
function load(){let x=localStorage.getItem(K);if(!x){save(cp(seed));x=localStorage.getItem(K)}return JSON.parse(x)}
function save(s){localStorage.setItem(K,JSON.stringify(s));return s}
function log(s,t,m){s.events.push({at:now(),type:t,message:m});if(s.events.length>60)s.events=s.events.slice(-60)}
function reset(){let s=cp(seed);log(s,'RESET','Scenario reset');return save(s)}
function verify(){let s=load();s.booking.status='VERIFIED';log(s,'CUSTOMER_VERIFIED',s.booking.bookingId+' OTP verified');return save(s)}
function start(){let s=load();s.booking.status='IN_TRIP';s.vehicle.status='ON_TRIP';s.trip.status='ACTIVE';s.trip.progressPct=1;s.trip.speedKph=24;log(s,'TRIP_STARTED',s.trip.tripId+' started');return save(s)}
function complete(){let s=load();s.booking.status='COMPLETED';s.vehicle.status='AVAILABLE';s.vehicle.node='Chennai One';s.vehicle.lat=12.9446;s.vehicle.lng=80.2189;s.trip.status='COMPLETED';s.trip.progressPct=100;s.trip.speedKph=0;s.payment.status='PAID';s.settlement.status='SETTLED';s.investor.tripEarning=48;s.investor.portfolioEarnings+=48;log(s,'TRIP_COMPLETED','Trip completed and ₹320 paid');log(s,'SETTLEMENT_POSTED','Investor earned ₹48');return save(s)}
function tick(){let s=load();if(s.trip.status!=='ACTIVE')return s;s.trip.elapsedSec+=2;s.trip.progressPct=Math.min(100,s.trip.progressPct+4);s.trip.speedKph=24+(s.trip.progressPct%5)*3;s.vehicle.battery=Math.max(78,Math.round(92-s.trip.progressPct*.12));let t=s.trip.progressPct/100;s.vehicle.lat=+(12.939+(12.9446-12.939)*t).toFixed(5);s.vehicle.lng=+(80.209+(80.2189-80.209)*t).toFixed(5);s.telemetry.totalEvents+=6;s.telemetry.lastEventAt=now();s.telemetry.eventRatePerMin=3780+(s.trip.progressPct%9)*13;s.telemetry.apiP95Ms=170+(s.trip.progressPct%7)*3;save(s);if(s.trip.progressPct>=100)return complete();return s}
w.ZapprideSim={load,reset,verify,start,complete,tick,key:K};
})(window);