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

  ngOnInit(): void {
    // this.sortByTitle();
    // this.topReasons = this.getMostUsed(4);
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

  getTopReasons(reasons: Reason[], numberOfResults: number) {
    const sortedReasons = [...reasons];
    return this.sortByUsageCount(sortedReasons).slice(0, numberOfResults);
  }

  onClick(reason: Reason) {
    console.log('click: ', reason);
    this.reasons.find((r) => r.id === reason.id).usageCount++;
    console.log(this.reasons);
  }

  private sortByUsageCount(reasons: Reason[]) {
    // const sortedReasons = [...reasons];
    const sortedReasons = reasons.filter((reason) => {
      return reason.usageCount > 0;
    });
    return sortedReasons.sort((a, b) => b.usageCount - a.usageCount);
  }
}
