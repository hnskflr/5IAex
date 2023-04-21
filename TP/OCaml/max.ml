let rec max (lst : int list) : int =
  match lst with
  | [] -> failwith "Empty list"
  | hd :: [] -> hd
  | hd :: tl -> let max = max tl in
      if hd > max then hd else max
