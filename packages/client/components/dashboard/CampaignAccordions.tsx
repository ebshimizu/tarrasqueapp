import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';

import { useGetUserCampaigns } from '../../hooks/data/campaigns/useGetUserCampaigns';
import { useReorderCampaigns } from '../../hooks/data/campaigns/useReorderCampaigns';
import { CampaignAccordion } from './CampaignAccordion';
import { NewCampaign } from './NewCampaign';

export const CampaignAccordions: React.FC = () => {
  const { data: campaigns } = useGetUserCampaigns();
  const reorderCampaigns = useReorderCampaigns();

  // Expand/collapse
  const [collapsedCampaigns, setCollapsedCampaigns] = useLocalStorage<string[]>('campaigns-collapsed', []);

  // Drag and drop
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [orderedCampaignIds, setOrderedCampaignIds] = useState<string[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 500, tolerance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Set initial order of campaign ids and update when campaigns change
  useEffect(() => {
    if (!campaigns) return;
    setOrderedCampaignIds(campaigns.map((campaign) => campaign.id));
  }, [campaigns]);

  /**
   * Handle toggling the expanded state of a campaign
   * @param campaignId - The ID of the campaign to toggle
   * @param expanded - The new expanded state of the campaign
   */
  function handleToggle(campaignId: string, expanded: boolean) {
    if (!campaignId) return;

    const newCollapsedCampaigns = [...collapsedCampaigns];

    if (expanded) {
      const index = collapsedCampaigns.indexOf(campaignId);
      if (index > -1) newCollapsedCampaigns.splice(index, 1);
    } else {
      newCollapsedCampaigns.push(campaignId);
    }

    setCollapsedCampaigns(newCollapsedCampaigns);
  }

  /**
   * Set active campaign id for drag and drop
   * @param event - Drag start event
   */
  function handleDragStart(event: DragStartEvent) {
    const activeId = event.active.id as string;
    setActiveId(activeId);
  }

  /**
   * Update order of campaign ids when campaign is dragged over another campaign
   * @param event - Drag over event
   */
  function handleDragOver(event: DragOverEvent) {
    if (!campaigns || !event.over) return;

    const activeId = event.active.id as string;
    const overId = event.over.id as string;

    if (event.active.id !== event.over.id) {
      const oldIndex = orderedCampaignIds.indexOf(activeId);
      const newIndex = orderedCampaignIds.indexOf(overId);

      // Update order of campaign ids
      setOrderedCampaignIds((orderedCampaignIds) => {
        const newMapIds = [...orderedCampaignIds];
        newMapIds.splice(oldIndex, 1);
        newMapIds.splice(newIndex, 0, activeId);
        return newMapIds;
      });
    }
  }

  /**
   * Send request to reorder campaigns if order has changed after drag end
   * @param event - Drag end event
   */
  function handleDragEnd(event: DragEndEvent) {
    if (!campaigns || !event.over) return;

    // Check if order has changed
    if (orderedCampaignIds.some((campaignId, index) => campaignId !== campaigns[index].id)) {
      reorderCampaigns.mutate(orderedCampaignIds);
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToParentElement]}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={orderedCampaignIds} strategy={verticalListSortingStrategy}>
          {campaigns ? (
            orderedCampaignIds?.map((campaignId) => (
              <CampaignAccordion
                key={campaignId}
                campaign={campaigns?.find((campaign) => campaign.id === campaignId)}
                expanded={!collapsedCampaigns.includes(campaignId)}
                onToggle={(expanded) => handleToggle(campaignId, expanded)}
              />
            ))
          ) : (
            <>
              {[...Array(4)].map((item, index) => (
                <CampaignAccordion key={index} />
              ))}
            </>
          )}
        </SortableContext>

        <DragOverlay modifiers={[restrictToParentElement]}>
          {activeId ? (
            <CampaignAccordion key={activeId} campaign={campaigns?.find((campaign) => campaign.id === activeId)} />
          ) : null}
        </DragOverlay>
      </DndContext>

      <NewCampaign />
    </>
  );
};
