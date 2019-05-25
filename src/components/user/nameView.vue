<template>
  <span>{{ userData.username }}
      <span v-if="userData.verified">
        <span v-if="userData.uuid == 'ba4161c03a42496c8ae07d13372f3371'">
          <b-tooltip target="site-creator" title="Site Creator" placement="right"></b-tooltip>
          <span class="small text-warning" id="site-creator" >
            <font-awesome-icon icon="crown" size="xs" class="align-baseline" />
          </span>
        </span>
        <span v-else>
          <b-tooltip target="verified" title="Verified" placement="right"></b-tooltip>
          <span class="small text-info" id="verified">
            <font-awesome-icon icon="check" size="xs" class="align-baseline" />
          </span>
        </span>
    </span>
  </span>
</template>

<script>
  export default {
    props: {
      userData: { type: Object }
    }
  }
</script>
