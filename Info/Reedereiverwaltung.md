```mermaid
flowchart LR

schiffe[schiffe] --- s_frachtgueter[schiffefrachtgueter]
s_frachtgueter --- frachtgueter[frachtgueter]
frachtgueter --- brandklassen[brandklassen]
frachtgueter --- frachtgueterhaefen[frachtgueterhaefen]
frachtgueterhaefen --- haefen[haefen]
haefen --- linien[linien]
linien --- haefen
linien --- frachtbrief[frachtbrief]
frachtbrief --- schiffe
frachtbrief --- frachtgueter

```


## Tabellen
schiffe (sid, sname, skapitaen)
frachtgueter (fid, fname, bid)
schiffefrachtgueter (sid, fid)
brandklassen (bid, bname)
haefen (hid, hname)
linien (lid, lentfernung, lausgang, lziel)
frachtgueterhaefen (hid, fid)
frachtbriefe (fbid, fabfahrt, fankunft, sif, lid, fid)