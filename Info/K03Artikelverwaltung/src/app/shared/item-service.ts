import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { Item } from "./item";
import { ItemFactory } from "./item-factory";

@Injectable()
export class ItemService {

    baseUrl = "http://localhost:3000/api/";

    constructor(private http: HttpClient) {}

    getAllItems(): Observable<Array<Item>> {
        return this.http.get<Array<Item>>(this.baseUrl + "items");
    }

    getItem(id: string): Observable<Item> {
        id = id.toUpperCase();
        return this.http.get<Item>(this.baseUrl + "items/" + id);
    }

    checkIdExists(id: string): Observable<boolean> {
        id = id.toUpperCase();

        return this.getItem(id).pipe(
            switchMap(item => {
                if (item != null) {
                    return new Observable<boolean>(obs => {
                        obs.next(true);
                        obs.complete();
                    });
                } else {
                    return new Observable<boolean>(obs => {
                        obs.next(false);
                        obs.complete();
                    });
                }
            }
            ),
            catchError((err, caught) => {
                return new Observable<boolean>(obs => {
                    obs.next(false);
                    obs.complete();
                });
              })
        );
    }

    createItem(item: Item) {
        item.id = item.id.toUpperCase();
        return this.http.post<Item>(this.baseUrl + "items", item);
    }

    updateItem(item: Item) {
        item.id = item.id.toUpperCase();
        return this.http.put(this.baseUrl + "items/" + item.id, item);
    }

    deleteItem(id: string) {
        id = id.toUpperCase();
        return this.http.delete(this.baseUrl + "items/" + id);
    }

    deleteAllItems(): Observable<any> {
        return this.getAllItems().pipe(
            switchMap(items => {
            if (items != null && items.length > 0) {
                return forkJoin(items.map(item => this.deleteItem(item.id)));
            } else {
                return new Observable(obs => {
                    obs.next(null);
                    obs.complete();
                });
            }
            })
        );
    }

    createAllItems() {
        return this.deleteAllItems().subscribe(res => {
            var items = ItemFactory.items();
            items.forEach(item => {
                this.createItem(item).subscribe();
            });
        });
    }
}