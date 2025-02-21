import { makeAutoObservable } from 'mobx';

import { CampaignInterface } from '../lib/types';

export enum CampaignModal {
  CreateUpdate = 'create-update',
  Delete = 'delete',
}

class CampaignsStore {
  selectedCampaign = null as unknown as CampaignInterface | null;
  modal = null as unknown as CampaignModal | null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Set the selected campaign to edit or remove
   * @param campaign - The campaign to edit or remove
   */
  setSelectedCampaign(campaign: CampaignInterface | null) {
    this.selectedCampaign = campaign;
  }

  /**
   * Set the modal to open
   * @param modal - The modal to open
   */
  setModal(modal: CampaignModal | null) {
    this.modal = modal;
  }
}

export const campaignsStore = new CampaignsStore();
