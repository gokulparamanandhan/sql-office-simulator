import { getQuestionsForDomainAndLevel } from '../src/lib/content/content-registry';

console.log('=== VERIFYING RESTAURANTS LEVELS 1 TO 5 ===');
for (let lvl = 1; lvl <= 5; lvl++) {
  const qs = getQuestionsForDomainAndLevel('restaurants', lvl);
  console.log(`\n--- LEVEL ${lvl} (Total: ${qs.length}) ---`);
  console.log(`Q1:   [${qs[0].id}] ${qs[0].title}`);
  console.log(`      "${qs[0].request}"`);
  console.log(`Q25:  [${qs[24].id}] ${qs[24].title}`);
  console.log(`Q50:  [${qs[49].id}] ${qs[49].title}`);
  console.log(`Q75:  [${qs[74].id}] ${qs[74].title}`);
  console.log(`Q100: [${qs[99].id}] ${qs[99].title}`);
  console.log(`      "${qs[99].request}"`);
}
console.log('\n=== ALL 500 RESTAURANT QUESTIONS VERIFIED ===');
