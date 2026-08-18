# Zappride Phase 1 Integrated Simulation

Golden path: `ZP-BK-1001 → ZP-EV-014 → TR-2408`.

This uses browser `localStorage` as the temporary shared event/state layer. Because the portals are routed under the same origin (`zappride.com`) at different paths, they can share the same simulation state without Supabase.

## Lifecycle
BOOKED → VERIFIED → IN_TRIP → COMPLETED → PAID → SETTLED → investor earning posted.

## Integration
Copy `shared/zappride-sim.js` into each portal and load it before the portal's `app.js`.

Agent calls `ZapprideSim.verify()` and `ZapprideSim.start()`.
All portals call `ZapprideSim.load()` every 1–2 seconds.
One portal/controller calls `ZapprideSim.tick()` every 2 seconds while the trip is ACTIVE.

## Portal mapping
- Agent: booking, OTP, handover, Start Trip.
- Business Ops: vehicle position, speed, battery, active trip.
- IT Ops: telemetry event rate, last event, API p95.
- Admin: booking/trip/payment/settlement records.
- Investor: settlement status and ₹48 incremental trip earning.

## Acceptance criterion
Start the trip once and see the same trip lifecycle reflected across all portals.

## Next phase
Replace localStorage behind the same state contract with Supabase tables + Realtime.
