# CNC Mill Driver

## Parser TODO

- [x] save g-code line information in struct
- better error handling

## Codes:
### G-Codes:
- [x] 00 Rapid Positioning
- [x] 01 Linear Interpolation
- [x] 02 Circular Interpolation Clockwise
- [x] 03 Circular Interpolation Counter Clockwise
- [x] 28 Homing

#### drilling:
- [x] 81 Drilling Cycle
- [x] 83 Peck Drilling Cycle

### M-Codes:
- [x] 00 Stop
- [x] 02 Program End
- [x] 03 Spindle On Clockwise
- [x] 04 Spindle On Counter Clockwise
- [x] 05 Spindle Stop
- [x] 30 Program End and Reset

### Others:
- [x] S  Speed
- [x] X
- [x] Y
- [x] Z
- [x] F Feedrate / movement speed
- [x] I  Arc X center
- [x] J  Arc Y center
- [x] K  Arc Z center
- [x] R  Arc Radius