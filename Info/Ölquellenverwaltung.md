## Grobentwurf

```mermaid
flowchart LR

quellen[Ölquellen]
	q_name([Name])
	q_menge([Fördermenge])
felder[Ölfelder]
	f_name([Name])
reservoirs[Ölreservoirs]
	r_name([Name])
laender[Länder]
	l_name([Name])
typen[Öltypen]
	t_name([Name])
beschaffenheiten[Beschaffenheiten]
	b_name[Name]
	b_tiefe[Tiefe]
produkte[Produkte]
	p_name
	p_kennung
menge([Menge])


gehoeren{gehören zu}
gespeist{werden gespeist}
gehoeren2{gehoeren zu}
foerdert{fördert}
haben{haben}
bestehen{bestehen aus}


quellen --- gehoeren
gehoeren --- felder

quellen --- foerdert
foerdert --- typen

quellen --- haben
haben --- beschaffenheiten

felder --- gespeist
gespeist --- reservoirs

felder --- gehoeren2
gehoeren2 --- laender

typen --- bestehen
bestehen --- menge
bestehen --- produkte


quellen --- q_name
quellen --- q_menge

felder --- f_name

reservoirs --- r_name

laender --- l_name

typen --- t_name

beschaffenheiten --- b_name
beschaffenheiten --- b_tiefe

produkte --- p_name
produkte --- p_kennung
```

## Feindatenmodell
oelquellen (qid, qbezeichnung(UNIQUE), qmenge, tid)
beschaffenheiten (bid, btiefe, bbeschreibung, gid)
oeltypen (tid, tname)
produkte (pid, pname)
oeltypenprodukte (tpid, tpmenge, tid, pid)
oelfelder (fid, fname, tid, lid)
oelreservoirs (rid, rname)
laender (lid, lname)
