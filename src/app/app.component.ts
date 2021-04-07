import { Component, OnInit } from '@angular/core';
import { REASONS } from './mock-reasons';
import { Reason } from './reason';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  reasons = REASONS;
  numberOfTopReasons = 4; // number of top-reasons to show on top of the dropdown.

  ngOnInit(): void {
    if (localStorage.getItem('reasons') === null) {
      localStorage.setItem('reasons', JSON.stringify([]));
    }
  }

  updateLocalTopReasons(reason: Reason) {
    const localReasons = JSON.parse(localStorage.getItem('reasons'));
    if (!this.containsObject(reason, localReasons)) {
      localReasons.unshift(reason);
    } else {
      const index = localReasons.findIndex((r) => r.id === reason.id);

      // switch order, put last used on top of the list
      [localReasons[0], localReasons[index]] = [
        localReasons[index],
        localReasons[0],
      ];
    }
    localStorage.setItem(
      'reasons',
      JSON.stringify(localReasons.slice(0, this.numberOfTopReasons))
    );
  }

  sortByTitle(reasons: Reason[]) {
    const sortedReasons = [...reasons];

    sortedReasons.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

    return sortedReasons;
  }

  getTopReasons() {
    return JSON.parse(localStorage.getItem('reasons'));
  }

  onClick(reason: Reason) {
    this.updateLocalTopReasons(reason);
  }

  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id === obj.id) {
        return true;
      }
    }

    return false;
  }
}
