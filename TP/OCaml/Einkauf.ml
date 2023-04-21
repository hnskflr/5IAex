(*Die Mengenangabe einer Ware kann in Stück, Kilo oder Liter sein*)
type mengenangabe = Stuck of int
                  |Kilo of float
                  |Liter of float;;

(* Eine einkaufsliste besteht aus mehreren Posten *)
type posten = {ware: string; menge: mengenangabe} ;;
type einkaufsliste = posten list;;

(* Beispiel Einkaufsliste *)
let a = {ware="Brot"; menge=Stuck 1};;
let b = {ware="Milch"; menge=Liter 3.0};;
let c = {ware="Salz"; menge=Kilo 0.5}
let d = [a;b;c]

(*Preisliste des Supermarktes*)
type preis = {ware: string; menge: mengenangabe; preis:float};;
let preise = [{ware="Brot"; menge=Stuck 1; preis=2.95};{ware="Milch"; menge=Liter 1.0; preis=0.95};
              { ware="Milch"; menge=Liter 0.5; preis=0.75};{ware="Salz"; menge=Kilo 0.25; preis=2.95}];;

exception Kein_Preis_bekannt;;


(* TODO Schreibe hier eine Funktion mit der Signatur: val faktor: mengenangabe -> mengenangabe -> float = <fun> *)

let faktor (m1: mengenangabe) (m2: mengenangabe) =
  match m1, m2 with
  | Stuck x, Stuck y -> float_of_int (x - y)
  | Kilo x, Kilo y -> (x -. y) /. y
  | Liter x, Liter y -> (x -. y) /. y
  | _, _ -> raise (Invalid_argument "Incompatible mengenangabe types")


(*Preis eines einzelnen Postens*)
let rec einzelpreis preise (posten:posten) = 
  match preise with
  |preis_1
   :: rest -> if (posten.ware = preis_1.ware && 
                  posten.menge>= preis_1.menge)
      then preis_1.preis *. (faktor posten.menge preis_1.menge)
      else einzelpreis rest posten
  | [] -> raise Kein_Preis_bekannt;;


(* TODO Schreibe hier eine Funktion mit der Signatur: val preis: einkaufsliste-> preis list-> float = <fun>, welche die Summe der Preise aller Posten berechnet *)

let rec preis (einkaufsliste: einkaufsliste) (preise: preis list) =
  match einkaufsliste with
  | posten :: rest -> (einzelpreis preise posten) +. (preis rest preise)
  | [] -> 0.0

