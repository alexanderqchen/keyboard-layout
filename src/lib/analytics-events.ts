export type LayoutName = "qwerty" | "dvorak" | "colemak";

export type PracticeProperties = {
  layout: LayoutName;
  practice_id: string;
  active_seconds: number;
  character_count: number;
};

export type AnalyticsEvents = {
  layout_selected: { layout: LayoutName; previous_layout: LayoutName };
  practice_started: PracticeProperties;
  practice_engaged: PracticeProperties;
  hints_toggled: { layout: LayoutName; enabled: boolean };
  recommendations_opened: { layout: LayoutName; placement: "below_tester" };
  affiliate_link_clicked: {
    layout: LayoutName;
    product_id: string;
    merchant: "keychron";
    placement: "below_tester";
  };
};

export type TrackEvent = <E extends keyof AnalyticsEvents>(
  event: E,
  properties: AnalyticsEvents[E]
) => void;
